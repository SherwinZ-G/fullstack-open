const _ = require('lodash');
const dummy = (blogs) => {
    return 1
  }
const totalLikes=(blogs)=>{
    const total= blogs.reduce((sum,blog)=>{return (sum+blog.likes)},0)
    return total
}
const mostLikes=(blogs)=>{
    const blogWithHighestLikes = blogs.reduce((maxBlog, currentBlog) => {
        return currentBlog.likes > maxBlog.likes ? currentBlog : maxBlog;
      }, blogs[0]);
      return blogWithHighestLikes;
}

const mostBlogs=(blogs)=>{
    if (blogs.length === 0) {
        return null; // 如果博客数组为空，返回 null 或者适当的默认值
      }
    
      // 使用 lodash 的 groupBy 函数按作者分组
      const groupedBlogs = _.groupBy(blogs, 'author');
      // 使用 lodash 的 mapValues 函数计算每位作者的博客数量
      const authorCounts = _.mapValues(groupedBlogs, blogs => blogs.length);
    
      // 使用 lodash 的 maxBy 函数找到拥有最多博客的作者
      const topAuthor = _.maxBy(_.keys(authorCounts), author => authorCounts[author]);
    
      return {
        author: topAuthor,
        blogs: authorCounts[topAuthor]
      };
}

const mostLikeAuthor=(blogs)=>{
        const groupedBlogs=_.groupBy(blogs,'author');
        const authorLikes = _.mapValues(groupedBlogs, blogs => _.sumBy(blogs, 'likes'));

        // 使用 lodash 的 maxBy 函数找到拥有最多喜欢的博客作者
        const topAuthor = _.maxBy(_.keys(authorLikes), author => authorLikes[author]);
      
        return {
          author: topAuthor,
          likes: authorLikes[topAuthor]
        };
      }

  module.exports = {
    dummy,
    totalLikes,
    mostLikes,
    mostBlogs,
    mostLikeAuthor
  }