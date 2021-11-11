interface IMath {
    calc: () => number
    add: (item: IMath) => void
    remove: (item: IMath) => void
    get: (index: number) => IMath | undefined
}

export enum MathOperationTypes {
    '+',
    '-',
    '*',
    '/'
}

class AbstractMath implements IMath {    
    calc(): number {
        throw new Error('Method calc should be implemented')
    }

    add(item: IMath) {
        throw new Error('Method add should be implemented')
    }

    remove(item: IMath) {
        throw new Error('Method remove should be implemented')
    }

    get(index: number): IMath | undefined {
        throw new Error('Method get should be implemented')
    }
}

export class MathInteger extends AbstractMath {
    private value: number

    constructor(value) {
        super()

        this.value = value
    }

    calc(): number {
        return this.value
    }

    add(item: IMath) {
        throw new Error('Method add can`t be called for MathInteger')
    }

    remove(item: IMath) {
        throw new Error('Method remove can`t be called for MathInteger')
    }

    get(index: number): IMath | undefined {
        throw new Error('Method get can`t be called for MathInteger')
    }
}

export class MathOperation extends AbstractMath {
    private operation: MathOperationTypes
    private list: IMath[] = []

    constructor(operation: MathOperationTypes) {
        super()

        this.operation = operation
    }

    calc(): number {
        const result = this.list.reduce((accumulator, item: IMath) => {
            if (accumulator === null) {
                return item.calc()
            }

            switch (this.operation) {
                case MathOperationTypes["+"]:
                    accumulator += item.calc()                    
                    break
                case MathOperationTypes["-"]:
                    accumulator -= item.calc()
                    break
                case MathOperationTypes["*"]:
                    accumulator *= item.calc()
                    break
                case MathOperationTypes["/"]:
                    accumulator /= item.calc()
                    break
            }

            return accumulator
        }, null as number)

        return result
    }

    add(item: IMath) {
        this.list.push(item)
    }

    remove(item: IMath) {
        const index = this.list.indexOf(item)
        if (index > -1) {
            this.list.splice(index, 1)
        }
    }

    get(index: number): IMath | undefined {
        return this.list[index]
    }
}