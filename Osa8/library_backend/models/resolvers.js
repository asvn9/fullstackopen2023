const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const Book = require('./book')
const User = require('./User')
const Author = require('./Author')
const {PubSub} = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
    Query: {
      bookCount: async () => Book.collection.countDocuments(),
      authorCount: async () => Author.collection.countDocuments(),
      allBooks: async (root, args) => {
        const { title, author, published, genre } = args;
        const query = {};
        if (title) {
          query.title = title;
        }
        if (author) {
          const authorObject = await Author.findOne({ name: author });
          query.author = authorObject._id;
        }
        if (published) {
          query.published = published;
        }
        if (genre) {
          query.genres = { $in: [genre] };
        }
        const books = await Book.find(query).populate("author");
        return books;
      },
  
      findBookByTitle: async (root, args)=> Book.findOne({title: args.title}),
      findBookByAuthor: async (root, args)=> {
        const author = await Author.findOne({name:args.author})
        const book = await Book.find({author: author._id}).populate('author')
        return book
      },
      findBookByGenre: async (root, args) => {
        const books = await Book.find({genres:args.genre}).populate('author')
        return books
      },
  
  
      allAuthors: async (root, args) => {
        const authors = await Author.find({})

        for (const author of authors) {
          const books = await Book.find({ author: author._id })
          author.bookCount = books.length
          await author.save()
        }
        return authors
      },
      me:(root,args, context) => {
        return context.currentUser
      }
    },
 
  
    Mutation: {
      addBook: async (root, args, context) => {
        const author = await Author.findOne({ name: args.author })
        const currentUser = context.currentUser
  
        if (!currentUser) {
          throw new GraphQLError('not authenticated', {
            extensions: {
              code: 'BAD_USER_INPUT'
            }
          }
          )
        }
  
        if (!author) {
          const newAuthor = new Author({ name: args.author, born: args.authorBorn })
          await newAuthor.save()
          args.author = newAuthor._id
        } else {
          args.author = author._id
        }
        const book = new Book({...args})
        
        try{
        await book.save()
        await book.populate('author')
        } catch (error){
          throw new GraphQLError('Saving book failed', {
            extensions:{
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error}
            
          })
        }
        pubsub.publish('BOOK_ADDED', {bookAdded:book})
  
        return book
      },

    
      editAuthor: async (root, args, context) => {
        const author = await Author.findOne({name: args.name})
        const currentUser = context.currentUser
  
        if (!currentUser) {
          throw new GraphQLError('not authenticated', {
            extensions: {
              code: 'BAD_USER_INPUT'
            }
          }
          )
        }
        if(!author){
          return null
        }
  
      author.born = args.born
      try {
        await author.save()
      }catch(error){
        throw new GraphQLError('Saving the year of birth failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }
      return author
    },
    createUser: async(root, args) => {
      const user = new User({username: args.username, favoriteGenre: args.favoriteGenre})
  
      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({username: args.username})
  
      if (!user || args.password !== 'secret'){
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }
      const userForToken = {
        username: user.username,
        id: user._id
      }
      return {value: jwt.sign(userForToken, process.env.JWT_SECRET)}
    }
  
  },
  Subscription: {
    bookAdded: {
      subscribe: () => {
        console.log('bookAdded subscription started');
        return pubsub.asyncIterator('BOOK_ADDED');
      }
    }
  }
}
  

  module.exports = resolvers