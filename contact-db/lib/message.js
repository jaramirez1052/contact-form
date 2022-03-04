'use strict';

module.exports = function setupMessage(MessageModel) {
    async function create(message) {
        const result = await MessageModel.create(message);
        return result.toJSON();
    }

    async function findAll() {
        return MessageModel.findAll({
            raw: true,
            order: [
                ['createdAt', 'DESC']
            ]
        });
    }

    async function findOne(id) {
        return MessageModel.findOne({
            where: {
                id
            }
        });
    }

    return {
        create,
        findAll,
        findOne
    }
}