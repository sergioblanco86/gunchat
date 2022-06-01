function logOutBtoTemplate() {
    return `
    <button onclick="userLogout()" class="logout-bto">Logout</button>
    `;
}

function chatBoxMessagesWrapperTemplate(){
    return `<div id="messages-wrapper"></div>`;
}

function chatBoxMessagesTemplate(message, user) {
    return `<div class="chatbox__messages">
        <div class="chatbox__messages__user-message">
            <div class="chatbox__messages__user-message--ind-message ${user == message.who ? 'mine' : ''}">
                <p class="name">${message.who}</p>
                <br />
                <p class="message">${message.what}</p>
            </div>
        </div>
    </div>`;
}

function messageAreaTemplate() {
    return `<form id="form-tag">
    <input type="text" placeholder="Enter your message" id="chat-message-box">
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