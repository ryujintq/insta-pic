const createFormData = (userId, file) => {
    const formData = new FormData()

    formData.append('folder', `users/${userId}/profileImage`)
    formData.append('image', file)

    return formData
}

export default createFormData
