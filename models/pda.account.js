class pdaAccount {
    constructor(username, password, name, email, phone, role, status, 
        birthday, address, trash, date_created, date_updated) {
        this.username = username ?? ''
        this.password = password ?? ''
        this.name = name ?? ''
        this.email = email ?? ''
        this.phone = phone ?? ''
        this.role = role ?? ''
        this.status = status ?? true
        this.birthday = birthday
        this.address = address ?? ''
        this.trash = trash ?? false
        this.date_created = date_created ?? Date.now()
        this.date_updated = date_updated ?? date_created
    }
}

module.exports = pdaAccount