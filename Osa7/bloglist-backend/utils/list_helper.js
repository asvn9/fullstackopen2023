const dummy = (blogs) => {
    return 1
}

const totalLikes = (array) => {
      var tot = array.reduce((a,b) =>  a+b.likes,0)
      return array.length === 0
      ? 0
      :tot
}

const favoriteBlog = (array) => {
    var fav = array.reduce(function(a,b) {
        return (a[4] > b[4] ? a : b)
    })
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}