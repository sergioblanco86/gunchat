gun = Gun(['./gun']);
SEA = Gun.SEA;
USER = gun.user().recall({ sessionStorage: true });
SECRET_KEY = "#foo";
CHATBOX = document.getElementById('chatbox');
chatMessageBox = null;
USER_ALIAS = null;

function checkUser() {
    if (USER.is) {
        showChat();
        USER.get("alias").on(function (v) {
            USER_ALIAS = v;
        })
    } else {
        showLogin();
    }
}

function showLogin() {
    CHATBOX.innerHTML = loginTemplate();
}

function showChat() {
    chatHTML = logOutBtoTemplate() + chatBoxMessagesWrapperTemplate() + messageAreaTemplate();
    CHATBOX.innerHTML = chatHTML;
    chatMessageBox = document.getElementById('chat-message-box');

    document.getElementById('form-tag').addEventListener('submit', function (e) {
        e.preventDefault();
    });

    chatBoxMessagesWrapper = document.getElementById('messages-wrapper');

    chatMessageBox.addEventListener("keyup", async function (event) {
        if (event.key === "Enter") {
            // Do work
            var messageText = chatMessageBox.value;
            const secret = await SEA.encrypt(messageText, SECRET_KEY);
            const message = USER.get("all").set({ what: secret });
            const index = new Date().toISOString();
            gun.get("chat").get(index).put(message);
            chatMessageBox.value = '';
        }
    });

    // GetGun chats
    gun
        .get("chat")
        .map()
        .once(async (data, id) => {
            if (data) {
                const message = {
                    // @ts-ignore
                    who: await gun.user(data).get("alias"),
                    what: (await SEA.decrypt(data.what, SECRET_KEY)) + "",
                    // @ts-ignore
                    when: Gun.state.is(data, "what"),
                };
                console.log({ message });

                chatBoxMessagesWrapper.innerHTML += chatBoxMessagesTemplate(message, USER_ALIAS);


                chatBoxMessagesWrapper.scrollTop = chatBoxMessagesWrapper.scrollHeight;

                // if (message.what) {
                //     setMessages(old => [...old.slice(-100), message]);
                // }
            }
        });
}

function userLogin() {
    username = document.getElementById('username').value;
    pass = document.getElementById('password').value;
    login(username, pass);
}

function login(username, pass) {
    USER.auth(username, pass, function (ack) {
        if ("err" in ack && ack.err) {
            alert(ack.err);
            showLogin();
        } else {
            checkUser();
        }
    })
}

function userSignUp() {
    username = document.getElementById('username').value;
    pass = document.getElementById('password').value;
    USER.create(username, pass, function (ack) {
        if ("err" in ack && ack.err) {
            console.log(ack.err);
        } else {
            login(username, pass);
        }
    })
}

function userLogout() {
    USER.leave();
    checkUser();
}



checkUser();