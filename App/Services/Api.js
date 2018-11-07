import apisauce from 'apisauce'

const create = (baseURL = 'https://api.github.com/search') => {

    const api = apisauce.create({
        baseURL,
        timeout: 15000
    })

    const getRepositories = (params) => api.get('/repositories', {q: params.q, sort: 'updated', order:'desc', per_page: 20, page: params.page })

    return {
        getRepositories,
    }
}

export default {
    create
}