gun = Gun([ location.origin + '/gun']);
SEA = Gun.SEA;
USER = gun.user().recall({ sessionStorage: true });
SECRET_KEY = "#foo";
CHATBOX = document.getElementById('chatbox');
chatMessageBox = null;
USER_ALIAS = null;
messages = [];

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
    passwordinput = document.getElementById('password');
    passwordinput.addEventListener("keyup", async function (event) {
        if (event.key === "Enter") {
            userLogin()
        }
    });
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

    var match = {
        // lexical queries are kind of like a limited RegEx or Glob.
        '.': {
          // property selector
          '>': new Date(+new Date() - 1 * 1000 * 60 * 60 * 3).toISOString(), // find any indexed property larger ~3 hours ago
        },
        '-': 1, // filter in reverse
      };

    // GetGun chats
    gun
        .get("chat")
        .map(match)
        .on(async (data, id) => {
            if (data) {
                const message = {
                    // @ts-ignore
                    id: id,
                    who: await gun.user(data).get("alias"),
                    what: (await SEA.decrypt(data.what, SECRET_KEY)) + "",
                    // @ts-ignore
                    when: Gun.state.is(data, "what"),
                };
                console.log({ message });

                var messages_copy = messages.filter(function(m){
                    return m.id == id
                })

                if (message.what && messages_copy.length == 0) {
                    messages = [...messages.slice(-100), message].sort((a, b) => a.when - b.when);
                    chatBoxMessagesWrapper.innerHTML = chatBoxMessagesTemplate(messages, USER_ALIAS);
                    chatBoxMessagesWrapper.scrollTop = chatBoxMessagesWrapper.scrollHeight;
                }
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
            alert(ack.err);
        } else {
            login(username, pass);
        }
    })
}

function userLogout() {
    USER.leave();
    checkUser();
    messages = [];
}



checkUser();