import {useSelector} from 'react-redux'
import {Link, useParams} from 'react-router-dom'

const BlogList = ({setBlogs, userid }) => {
  const blogs = useSelector(state => state.blogs)
  const userId = useParams().id
  let blogs2 = [...blogs]

  if (userid === true){
   blogs2 = blogs2.filter(blog => userId.includes(blog.user.id));
  } 

  return (
    <div>
      {blogs2
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <div key={blog.id}>
            {<Link to ={`/blogs/${blog.id}`}>{blog.title}</Link>}
          </div>
        ))}
    </div>
  )
}

export default BlogList
