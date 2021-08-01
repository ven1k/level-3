function DataTable(config, data) {

    let idCount = 1;
    let currentTablePlace = document.getElementById(config.parent.substring(1, config.parent.length));
    let defaultTablePlace;


    function workWithTable(fullTable, currentTag, className) {
        let curr = document.createElement(currentTag);

        if (className) {
            curr.setAttribute("id", className);
        }
        fullTable.append(curr);

        return fullTable.querySelector(currentTag);
    }

    function crateThTags(currentTablePlace, config) {
        workWithTable(currentTablePlace, "th", "th" + 0);
        document.getElementById("th" + 0).innerHTML = "№";

        for (let i = 0; i < config.columns.length; i++) {
            let currentId = "th" + (i + 1);
            workWithTable(currentTablePlace, "th", currentId);
            document.getElementById(currentId).innerHTML = config.columns[i].title;

        }

    }

    function crateTdTags(currentTablePlace, data, idCount) {
        for (let i = 0; i < data.length; i++) {
            workWithTable(currentTablePlace, "tr", data[i].id);
            let currentTbodyPlace = document.getElementById(data[i].id);

            Object.values(data[i]).forEach(function (key) {
                workWithTable(currentTbodyPlace, "td", idCount);
                if (key === data[i].id) {
                    document.getElementById(idCount).innerHTML = i + 1;
                } else {
                    document.getElementById(idCount).innerHTML = key;
                }
                idCount++;
            });
        }
    }

    currentTablePlace = workWithTable(currentTablePlace, 'table');
    defaultTablePlace = currentTablePlace; // tag <table>
    currentTablePlace = workWithTable(currentTablePlace, "thead");
    currentTablePlace = workWithTable(currentTablePlace, "tr", "tr");

    crateThTags(currentTablePlace, config);
    currentTablePlace = workWithTable(defaultTablePlace, "tbody");
    crateTdTags(currentTablePlace, data, idCount);


}

const config1 = {
    parent: '#usersTable',
    columns: [
        {title: 'Имя', value: 'name'},
        {title: 'Фамилия', value: 'surname'},
        {title: 'Возраст', value: 'age'},
    ]
};

const users = [
    {id: 30050, name: 'Вася', surname: 'Петров', age: 12},
    {id: 30051, name: 'Вася', surname: 'Васечкин', age: 15},
];

DataTable(config1, users);
