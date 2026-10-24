
export function authorizeModification(req, res, next) {
    const { role, id } = req.user;

    const isParent = role === "parent";
    const isChildOnOwn = role === "child" && String(id) === String(req.params.userId);

    if (!isParent && !isChildOnOwn) {
        return res.status(403).json({ error: "Access denied" });
    }
    next();
}