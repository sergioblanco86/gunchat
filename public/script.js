gun = Gun(['http://localhost:3000/gun']);
SEA = Gun.SEA;
SECRET_KEY = "#foo";
// getChat
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

            if (message.what) {
                setMessages(old => [...old.slice(-100), message]);
            }
        }
    });

document.getElementById('form-tag').addEventListener('submit', function(e){
    e.preventDefault();
});


const chatMessageBox = document.getElementById('chat-message-box');
node.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        // Do work
        let newMessage = chatMessageBox.value;
        const secret = await SEA.encrypt(newMessage, SECRET_KEY);
        const message = user.get("all").set({ what: secret });
        const index = new Date().toISOString();
        gun.get("chat").get(index).put(message);
    }
});
