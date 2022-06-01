function logOutBtoTemplate() {
    return `
    <button onclick="userLogout()" class="logout-bto">Log Out</button>
    `;
}

function chatBoxMessagesWrapperTemplate(){
    return `<div id="messages-wrapper"></div>`;
}

function chatBoxMessagesTemplate(messages, user) {
    messagesHTML = '';
    messages.forEach(message => {
        const ts = new Date(message.when);
        messagesHTML += `<div class="chatbox__messages">
        <div class="chatbox__messages__user-message">
            <div class="chatbox__messages__user-message--ind-message ${user == message.who ? 'mine' : ''}">
                <p class="name">${message.who}</p>
                <br />
                <p class="message">${message.what}</p>
                <p class="when">${ts.toLocaleTimeString()}</p>
            </div>
        </div>
    </div>`;
    });
    return messagesHTML;
}

function messageAreaTemplate() {
    return `<form id="form-tag">
    <input type="text" placeholder="Enter your message and hit Enter" id="chat-message-box">
</form>`;
}

function loginTemplate() {
    return `<div class="login">
    <h5>Login or Sign Up</h5>
    <input type="text" id="username" placeholder="User Name">
    <input type="password" id="password" placeholder="Password">
    <button onclick="userLogin()">Login</button>
    <button onclick="userSignUp()">Sing Up</button>
  </div>`;
}