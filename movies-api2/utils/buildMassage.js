//utilidad que permite crear un mensaje
function buildMessage(entity, action) {
  // 'movie list' de utils.buildMassage.test.js'
  if (action === 'list') {
    return `${entity}s ${action}ed`;
  }
  // 'movie created' de utils.buildMassage.test.js'
  return `${entity} ${action}d`;
}

module.exports = buildMessage;
