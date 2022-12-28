const urlPref = 'http://localhost:8080/api';

// navbar-info
const updHeaderInfo = (user) => {
    let el = `<span class="fw-bolder">${user.username}</span>
        <span> with roles: </span>
        <span>
    `;
    user.roles.forEach(role => {
        const roleName = role.name;
        el += `<span>${roleName.substring(roleName.lastIndexOf('_') + 1)}</span> `;
    });
    el += '</span>';
    document.getElementById('headerInfo').innerHTML = el;
}

sendRequest('GET', '/user').then(user => updHeaderInfo(user))

const updUserInfoTableRowContent = (user) => {
    let el = `
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.lastname}</td>
        <td>${user.age}</td>
        <td>${user.username}</td>
        <td>
    `;
    user.roles.forEach(role => {
        const roleName = role.name;
        el += `<span>${roleName.substring(roleName.lastIndexOf('_') + 1)}</span> `;
    });
    el += '</td>';
    document.getElementById('userInfoTableRow').innerHTML = el;
}

sendRequest('GET', '/user').then(user => updUserInfoTableRowContent(user))

if (document.getElementById('v-pills-admin')) {
    const updAllUsersTableContent = (users) => {
        users.forEach(user => tableAddRowContent(user))
    };

    const tableAddRowContent = (user) => {
        let el = `
            <tr id="allUsersTableRow${user.id}">
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.lastname}</td>
                <td>${user.age}</td>
                <td>${user.username}</td>
                <td>
        `;
        user.roles.forEach(role => {
            const roleName = role.name;
            el += `<span>${roleName.substring(roleName.lastIndexOf('_') + 1)}</span> `;
        });
        el += `</td>
                <td>
                    <button type="button" class="btn btn-info text-white" data-bs-toggle="modal" data-bs-target="#editModal" data-bs-userId="${user.id}">Edit</button>
                </td>
                <td>
                    <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal" data-bs-userId="${user.id}">Delete</button>
                </td>
            </tr>
        `;
        document.getElementById('usersListTableBody').innerHTML += el;
    }

    const allUsersTableRowUpdate = (user) => {
        let el = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.lastname}</td>
            <td>${user.age}</td>
            <td>${user.username}</td>
            <td>
        `;
        user.roles.forEach(role => {
            const roleName = role.name;
            el += `<span>${roleName.substring(roleName.lastIndexOf('_') + 1)}</span> `;
        });
        el += `</td>
            <td>
                <button type="button" class="btn btn-info text-white" data-bs-toggle="modal" data-bs-target="#editModal" data-bs-userId="${user.id}">Edit</button>
            </td>
            <td>
                <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal" data-bs-userId="${user.id}">Delete</button>
            </td>
        `;
        document.getElementById('allUsersTableRow' + user.id).innerHTML = el;
    };

    const allUsersTableRowDelete = (id) => {
        document.getElementById('allUsersTableRow' + id).remove();
    }

    const updEditModalFormContent = (user) => {
        document.getElementById('editForm').innerHTML = `
            <label class="d-block mx-auto pt-1 mt-2 mb-0 text-center fs-5 fw-bold">ID
                <input id="idEdit" value="${user.id}" type="text" disabled class="form-control mx-auto" style="width: 250px;"></label>
            <label class="form-label d-block mx-auto pt-1 mt-2 mb-0 text-center fs-5 fw-bold">First name
                <input id="firstNameEdit" value="${user.name}" type="text" class="form-control mx-auto" style="width: 250px;"></label>
            <label class="form-label d-block mx-auto pt-1 mt-3 mb-0 text-center fs-5 fw-bold">Last name
                <input id="lastNameEdit" value="${user.lastname}" type="text" class="form-control mx-auto" style="width: 250px;"></label>
            <label class="form-label d-block mx-auto pt-1 mt-3 mb-0 text-center fs-5 fw-bold">Age
                <input id="ageEdit" min="0" max="200" value="${user.age}" type="number" class="form-control mx-auto" style="width: 250px;"></label>
            <label class="form-label d-block mx-auto pt-1 mt-3 mb-0 text-center fs-5 fw-bold">Email
                <input id="usernameEdit" value="${user.username}" required type="email" class="form-control mx-auto" style="width: 250px;"></label>
            <label class="form-label d-block mx-auto pt-1 mt-3 mb-0 text-center fs-5 fw-bold">Password
                <input id="passwordEdit" value="" type="text" class="form-control mx-auto" style="width: 250px;" placeholder="Type new password"></label>
            <label class="form-label d-block mx-auto pt-1 mt-3 mb-0 text-center fs-5 fw-bold">Role
                <select size="2" multiple required class="form-select mx-auto" style="width: 250px;">
                    <option id="optionAdmin">ADMIN</option>
                    <option id="optionUser">USER</option>
                </select>
            </label>
        `;
        user.roles.forEach(role => {
            if (role.id === 1) document.getElementById('optionUser').selected = true;
            if (role.id === 2) document.getElementById('optionAdmin').selected = true;
        });
    };

    const updDeleteModalContent = (user) => {
        let el = `
            <label class="d-block mx-auto pt-1 mt-2 mb-0 text-center fs-5 fw-bold">ID</label>
            <input id="deleteUserId" value="${user.id}" disabled type="text" class="form-control mx-auto" style="width: 250px;">
            <label class="form-label d-block mx-auto pt-1 mt-3 mb-0 text-center fs-5 fw-bold">First name</label>
            <input value="${user.name}" disabled type="text" class="form-control mx-auto" style="width: 250px;">
            <label class="form-label d-block mx-auto pt-1 mt-3 mb-0 text-center fs-5 fw-bold">Last name</label>
            <input value="${user.lastname}" disabled type="text" class="form-control mx-auto" style="width: 250px;">
            <label class="form-label d-block mx-auto pt-1 mt-3 mb-0 text-center fs-5 fw-bold">Age</label>
            <input value="${user.age}" disabled type="number" class="form-control mx-auto" style="width: 250px;">
            <label class="form-label d-block mx-auto pt-1 mt-3 mb-0 text-center fs-5 fw-bold">Email</label>
            <input value="${user.username}" disabled type="text" class="form-control mx-auto" style="width: 250px;">
            <label class="form-label d-block mx-auto pt-1 mt-3 mb-0 text-center fs-5 fw-bold">Role</label>
            <select size="2" disabled class="form-select mx-auto" style="width: 250px;">
        `;
        user.roles.forEach(role => {
            const roleName = role.name;
            el += `<option label="${roleName.substring(roleName.lastIndexOf('_') + 1)}"></option> `;
        });
        el += `</select>`;
        document.getElementById('deleteModalContent').innerHTML = el;
    };

    //заполнение All users
    sendRequest('GET', '/admin').then(users => updAllUsersTableContent(users));

    //New user
    document.getElementById('createUserForm').addEventListener('submit', (event) => {
        event.preventDefault();
        //готовим запрос
        const newUserRoles = [];
        if (document.getElementById('newRoleUser').selected) newUserRoles.push({id: 1, name: 'ROLE_USER'});
        if (document.getElementById('newRoleAdmin').selected) newUserRoles.push({id: 2, name: 'ROLE_ADMIN'});
        const newUser = {
            name: document.getElementById('newUserFirstName').value,
            lastname: document.getElementById('newUserLastName').value,
            age: document.getElementById('newUserAge').value,
            username: document.getElementById('newUserEmail').value,
            password: document.getElementById('newUserPassword').value,
            roles: newUserRoles
        };
        //Очищаем форму
        document.getElementById('newUserFirstName').value = '';
        document.getElementById('newUserLastName').value = '';
        document.getElementById('newUserAge').value = '';
        document.getElementById('newUserEmail').value = '';
        document.getElementById('newUserPassword').value = '';
        document.getElementById('newRoleUser').selected = true;
        document.getElementById('newRoleAdmin').selected = false;
        sendRequest('POST', '/admin', newUser).then(user => {
            if (!user.id) {
                 sendRequest('GET', '/admin/find/' + user.username).then(usr => {
                     tableAddRowContent(usr);
                 })
            } else {
                tableAddRowContent(user);
            }
        });

        bootstrap.Tab.getInstance(document.querySelector('#nav-tab a[href="#nav-usersTable"]')).show();
    });

    //modal - Edit user
    document.getElementById('editModal').addEventListener('show.bs.modal', (event) => {
        const userId = event.relatedTarget.getAttribute('data-bs-userId');
        // Заполняем форму
        sendRequest('GET', '/admin/' + userId).then(user => updEditModalFormContent(user));
    });

    //Обновление юзера
    document.getElementById('editForm').addEventListener('submit', (event) => {
        event.preventDefault();
        const userRolesEdited = [];
        if (document.getElementById('optionUser').selected) userRolesEdited.push({id: 1, name: 'ROLE_USER'});
        if (document.getElementById('optionAdmin').selected) userRolesEdited.push({id: 2, name: 'ROLE_ADMIN'});
        const userEdited = {
            id: document.getElementById('idEdit').value,
            name: document.getElementById('firstNameEdit').value,
            lastname: document.getElementById('lastNameEdit').value,
            age: document.getElementById('ageEdit').value,
            username: document.getElementById('usernameEdit').value,
            password: document.getElementById('passwordEdit').value,
            roles: userRolesEdited
        };
        sendRequest('PUT', '/admin', userEdited).then(user => {
            if (user) allUsersTableRowUpdate(user);
        });
        document.getElementById('buttonCloseModal').click();
    });

    //modal - Delete user
    document.getElementById('deleteModal').addEventListener('show.bs.modal', (event) => {
        const userId = event.relatedTarget.getAttribute('data-bs-userId');
        //заполняем форму
        sendRequest('GET', '/admin/' + userId).then(user => updDeleteModalContent(user));
    });

    //удаление юзера
    document.getElementById('deleteForm').addEventListener('submit', (event) => {
        event.preventDefault();
        sendRequest('DELETE', '/admin/' + document.getElementById('deleteUserId').value).then(id => allUsersTableRowDelete(id));
    });
}

function sendRequest(method, url, body = null) {
    const options = {
        method: method,
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    return fetch(urlPref + url, method === 'GET' ? null : options).then(response => response.json());
}