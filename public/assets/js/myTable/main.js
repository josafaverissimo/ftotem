export class MyTable {
    __table
    __formAction

    get formAction() {
        return this.__formAction
    }

    loadTable(tableId) {
        this.__setTable(tableId)
        this.__setFormAction(this.__table)
    }

    __setTable(tableId) {
        this.__table = document.getElementById(tableId)
    }

    __setFormAction(table) {
        this.__formAction = table.querySelector('.mytable__form-action')
    }
}