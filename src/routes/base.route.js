
module.exports = [
  {
    method: 'GET',
    path: '/public/get',
    handler: (request, h) => {
      return '禁止访问！'
    }
  }
]
