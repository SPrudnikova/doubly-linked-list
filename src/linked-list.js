const Node = require('./node');

class LinkedList {
    constructor() {
        this._head = null;
        this._tail = null;
        this.length = 0;
    }

    append(data) {
        const newNode = new Node(data);
        if(this.length > 0) {
            this._tail.next = newNode;
            newNode.prev = this._tail;
            this._tail = newNode;
        } else {
            this._head = newNode;
            this._tail = newNode;
        }

        this.length = this.length+1;
        return this;
    }

    head() {
        return this._head.data;
    }

    tail() {
        return this._tail.data;
    }

    at(index) {
        let currentNode = this._head;
        let i = 0;
        while(i < index){
            currentNode = currentNode.next;
            i = i + 1;
        }
        return currentNode.data;
    }

    _nodeAt(index) {
        let currentNode = this._head;
        let i = 0;
        while(i < index){
            currentNode = currentNode.next;
            i = i + 1;
        }
        return currentNode;
    }

    insertAt(index, data) {
        if (index < 0 || index > this.length + 1) {
            throw new Error('Inappropriate index');
        }
        const newNode = new Node(data);
        if (index === 0) {
            newNode.prev = null;
            newNode.next = this._head;
            this._head = newNode;
        } else if(index === this.length) {
            newNode.prev = this._tail;
            newNode.next = null;
            this._tail = newNode;
        } else {
            const prevNode = this._nodeAt(index-1);
            const nextNode = this._nodeAt(index);
            newNode.prev = prevNode;
            newNode.next = nextNode;
            prevNode.next = newNode;
            nextNode.prev = newNode;
        }

        this.length = this.length+1;
        return this;
    }

    isEmpty() {
        return this.length === 0;
    }

    clear() {
        //why we need to set node with data property === null
        //but can't set this._head = null and this._tail = null?
        const nullNode = new Node(null);
        this._head = nullNode;
        this._tail = nullNode;
        this.length = 0;
        return this;
    }

    deleteAt(index) {
        if (index > -1 && index < this.length){
            if (index === 0){
                return this.clear();
            } else if (index === this.length - 1){
                let currentNode = this._tail;
                this._tail = currentNode.prev;
                this._tail.next = null;
            } else {
                let currentNode = this._nodeAt(index);
                currentNode.prev.next = currentNode.next;
            }

            this.length = this.length - 1;
            return this;
        } else {
            throw new Error('Inappropriate index');
        }
    }

    reverse() {
        let currentNode = this._head;
        for (let i = 0; i < this.length; i++) {
            const nextNode = currentNode.next;
            currentNode.next = currentNode.prev;
            currentNode.prev = nextNode;
            currentNode = nextNode;
        }

        const tempTail = this._tail;
        this._tail = this._head;
        this._head = tempTail;

        return this;
    }

    indexOf(data) {
        let currentNode = this._head;
        for (let i = 0; i < this.length; i++){
            if (data === currentNode.data) {
                return i;
            }
            currentNode = currentNode.next;
        }

        return -1;
    }
}

module.exports = LinkedList;

