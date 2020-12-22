const doc = (req, res) => {
    const data = {
        data: 'hola',
        authors: 'hello'
    }
    return res.status(200).json(data);
}

module.exports = doc;