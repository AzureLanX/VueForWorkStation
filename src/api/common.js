import request from '@/utils/request.js'

// 上传文件到aliyun oss
export const uploadFileService = (formData) => {
    return request.post('/common/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}