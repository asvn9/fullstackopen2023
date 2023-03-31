const dummy = (blogs) => {
    return 1
}

const totalLikes = (array) => {
    var tot = array.reduce((a, b) => a + b.likes, 0)
    return array.length === 0
        ? 0
        : tot
}

const favoriteBlog = (array) => {
    const fav = array.reduce(function (a, b) {
        return a.likes > b.likes ? a : b
    })
    return {
        title: fav.title,
        likes: fav.likes
    }
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}