const MentionAttribute = 'mention';
export function findMentions(snapshot) {
    const mentionedUserIds = new Set();
    if (snapshot.props.type === 'text' &&
        snapshot.props.text &&
        'delta' in snapshot.props.text) {
        const delta = snapshot.props.text
            .delta;
        for (const op of delta) {
            if (op.attributes?.[MentionAttribute]) {
                mentionedUserIds.add(op.attributes[MentionAttribute].member);
            }
        }
    }
    for (const block of snapshot.children) {
        findMentions(block).forEach(userId => {
            mentionedUserIds.add(userId);
        });
    }
    return Array.from(mentionedUserIds);
}
//# sourceMappingURL=utils.js.map