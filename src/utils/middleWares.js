import { users } from '../data.js';
export const resolveUserById = (req, res, next) => {
    const {
        params: { id }
    } = req;
    const parseId = parseInt(id);
    if (isNaN(parseId)) {
        res.sendStatus(400);
        return;
    }
    const userIndex = users.findIndex(user => user.id === parseId);
    if (userIndex === -1) {
        res.sendStatus(404);
        return;
    }
    req.userIndex = userIndex;
    next();
};
