const list = document.getElementById("list");
let stored = JSON.parse(localStorage.getItem("todoItems")) || [];

function sub() {
    try {
        const lists = document.getElementById("to-do").value;
        if (lists == "") return;


        const values = document.createElement("div");
        values.className = "values";

        const mainHolder = document.createElement("div");
        mainHolder.className = "mainHolder";
        mainHolder.textContent = lists;
        mainHolder.setAttribute("orig", lists);
        values.appendChild(mainHolder);

        const changer = document.createElement("div");
        changer.className = "changer";
        values.appendChild(changer);

        const imgMake1 = document.createElement("img");
        imgMake1.src = "trash.svg";
        const bura = document.createElement("button");
        bura.className = "bura";
        bura.appendChild(imgMake1);
        changer.appendChild(bura);

        const edit = document.createElement("img");
        edit.className = "bura";
        edit.src = "edit.svg";
        changer.appendChild(edit);

        edit.addEventListener("click", function () {
            edit.remove();
            mainHolder.contentEditable = true;
            mainHolder.spellcheck = false;
            mainHolder.focus();
            const range = document.createRange();
            const selection = window.getSelection();
            range.selectNodeContents(mainHolder);
            range.collapse(false); // place at end
            selection.removeAllRanges();
            selection.addRange(range);

            const check = document.createElement("button");
            check.className = "bura";
            check.textContent = "✅";
            changer.appendChild(check);

            check.addEventListener("click", function () {
                check.remove();
                mainHolder.contentEditable = false;
                changer.appendChild(edit);

                const edited = mainHolder.textContent;
                const original = mainHolder.getAttribute("orig");
                const index = stored.indexOf(original);
                if (edited) {
                    if (index !== -1) {
                        stored[index] = edited;
                        localStorage.setItem(
                            "todoItems",
                            JSON.stringify(stored)
                        );
                        mainHolder.setAttribute("orig", edited);
                    }
                } else {
                    stored.splice(index, 1);
                    localStorage.setItem("todoItems", JSON.stringify(stored));
                    values.remove();
                }

                //Edited Memory Storage Value
                console.log(JSON.stringify(stored));
            });
        });

        bura.addEventListener("click", function delte() {
            const original = mainHolder.getAttribute("orig");
            const index = stored.indexOf(original);
            stored.splice(index, 1);
            localStorage.setItem("todoItems", JSON.stringify(stored));
            values.remove();

            //Clear Single Line of Value
            console.log(JSON.stringify(stored));
        });

        //Storing Values
        stored.push(lists);
        localStorage.setItem("todoItems", JSON.stringify(stored));

        list.appendChild(values);
        document.getElementById("to-do").value = "";

        //Updated Memory Storage Value
        console.log(JSON.stringify(stored));
    } catch {
        alert("Your Storage Might Be FUll!");
    }
}

const addList = document.getElementById("sub");
addList.onclick = sub;

const loadBtn = document.getElementById("load");
const addTask = document.getElementById("sub");

//Loading part
load = () => {
    try {
        alert("Load SuccessFully");
        document.getElementById("to-do").disabled = false;
        document.addEventListener("keydown", function (enter) {
            if (enter.key == "Enter") {
                sub();
            }
        });

        addTask.classList.remove("hide");
        loadBtn.classList.remove("show");

        stored.forEach((lists) => {
            const values = document.createElement("div");
            values.className = "values";

            const mainHolder = document.createElement("div");
            mainHolder.className = "mainHolder";
            mainHolder.textContent = lists;
            mainHolder.setAttribute("orig", lists);
            values.appendChild(mainHolder);

            const changer = document.createElement("div");
            changer.className = "changer";
            values.appendChild(changer);

            const imgMake1 = document.createElement("img");
            imgMake1.src = "trash.svg";

            const bura = document.createElement("button");
            bura.className = "bura";
            bura.appendChild(imgMake1);
            changer.appendChild(bura);

            const edit = document.createElement("img");
            edit.className = "bura";
            edit.src = "edit.svg";
            changer.appendChild(edit);

            edit.addEventListener("click", function () {
                edit.remove();
                mainHolder.contentEditable = true;
                mainHolder.spellcheck = false;
                mainHolder.focus();
                const range = document.createRange();
                const selection = window.getSelection();
                range.selectNodeContents(mainHolder);
                range.collapse(false); // place at end
                selection.removeAllRanges();
                selection.addRange(range);

                const check = document.createElement("button");
                check.className = "bura";
                check.textContent = "✅";
                changer.appendChild(check);

                check.addEventListener("click", function () {
                    check.remove();
                    mainHolder.contentEditable = false;
                    changer.appendChild(edit);

                    const edited = mainHolder.textContent;
                    const original = mainHolder.getAttribute("orig");
                    const index = stored.indexOf(original);
                    if (edited) {
                        if (index !== -1) {
                            stored[index] = edited;
                            localStorage.setItem(
                                "todoItems",
                                JSON.stringify(stored)
                            );
                            mainHolder.setAttribute("orig", edited);
                        }
                    } else {
                        stored.splice(index, 1);
                        localStorage.setItem(
                            "todoItems",
                            JSON.stringify(stored)
                        );
                        values.remove();
                    }

                    //Edited Memory Storage Value
                    console.log(JSON.stringify(stored));
                });
            });

            bura.addEventListener("click", function () {
                const original = mainHolder.getAttribute("orig");
                const index = stored.indexOf(original);
                stored.splice(index, 1);
                localStorage.setItem("todoItems", JSON.stringify(stored));

                values.remove();

                //Clear Single Line of Value
                console.log(JSON.stringify(stored));
            });
            list.appendChild(values);
        });
        //Load Value of Storage
        console.log(JSON.stringify(stored));
    } catch {
        alert("Load Unsucessfully");
    }
};

//Clear part
document.getElementById("clear").addEventListener("click", function () {
    document.getElementById("to-do").disabled = false;
    addTask.classList.remove("hide");
    loadBtn.classList.remove("show");
    document.addEventListener("keydown", function (enter) {
        if (enter.key == "Enter") {
            sub();
        }
    });
    list.innerHTML = "";
    localStorage.clear();
    stored = [];
    //Clear Single Line of Value
    console.log(JSON.stringify(stored));
});

//Storage checker
if (stored.length > 0) {
    document.getElementById("to-do").disabled = true;
    loadBtn.classList.add("show");
    addTask.classList.add("hide");
    loadBtn.onclick = load;
} else {
    document.addEventListener("keydown", function (enter) {
        if (enter.key == "Enter") {
            sub();
        }
    });
}

//Memory Storage Value
console.log(JSON.stringify(stored));



