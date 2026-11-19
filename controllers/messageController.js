const db = require('../db/queries');

async function showCreateMessageForm(req, res) {
  res.render('createMessage', { title: 'Create Message' });
}

async function createMessage(req, res) {
  const { title, content } = req.body;
  const userId = req.user.id; // Assuming you have user authentication and req.user is populated

  try {
    await db.saveMessage(title, content, userId);
    res.redirect('/'); // Redirect to home or messages page after successful creation
  } catch (error) {
    console.error('Error creating message:', error);
    res.status(500).send('Internal Server Error');
  }
}

async function deleteMessageById(req, res) {
  const messageId = req.params.id;

  try {
    await db.deleteMessageById(messageId);
    res.redirect('/'); // Redirect to home or messages page after successful deletion
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = {
  showCreateMessageForm,
  createMessage,
  deleteMessageById,
};