export function htmlTableField (column0 = '', column1 = '', column2 = '') {
    const field = document.createElement('tr');

    field.innerHTML = `
        <td width="50">${column0}</td>
        <td>${column1}</td>
        <td>${column2}</td>
        <td width="50">
            <i class="remove icon delete" data-name='${column1}'></i>
        </td>
    `;

    return field;
}
