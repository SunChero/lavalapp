import { observable, action, asMap } from 'mobx'

import { persist } from 'mobx-persist'







export class CountStore {

    @persist @observable count = 0

    @action inc() {

        this.count = this.count + 1

    }

}



class Item {

    @persist @observable info = ''

}



export class MapStore {

    @persist('map') @observable items =  new Map()


    @action test(key = 'test') {

        console.warn(this.items.keys().join('.'))

        this.items.set(key, "sometyinhg")

    }

}



export class ListStore {

    @persist('list') @observable list = []

    @action test(text = `${Date.now()}`) {

        this.list.push({ text })

    }

}