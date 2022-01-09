import LinkedList from './LinkedList.js';

export default class Stack {
    constructor() {
        this.linkedList = new LinkedList();
        this.count = 0;
        this.allSame = false;
    }

    isEmpty() {
        return !this.linkedList.head;
    }

    size() {
        return this.count;
    }

    peek() {
        if (this.isEmpty()) {
            return null;
        }

        return this.linkedList.head.value;
    }

    push(value) {
        this.linkedList.prepend(value);
        this.count++;
        this.allSame = this.isAllSame();
    }

    isAllSame(){
        if(this.size() !== 4) return false

        const values = this.toArray()
        let first = values[0]
        for (const value of values) {
            if(first !== value) return false
        }

        return true
    }

    pop() {
        const removedHead = this.linkedList.deleteHead();
        this.allSame = this.isAllSame();

        if (removedHead) {
            this.count--;
            return removedHead.value;
        }
        return null;
    }

    toArray() {
        return [...this.linkedList
            .toArray()
            .map((linkedListNode) => linkedListNode.value)];
    }

    toString(callback) {
        return this.linkedList.toString(callback);
    }
}