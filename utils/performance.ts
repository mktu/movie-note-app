class PerformanceTimer {
    key = ''
    _comment: string[] = []
    start = 0
    stoped = false
    time = 0
    pc: PerformanceCounter
    constructor(key: string, pc: PerformanceCounter) {
        this.key = key
        this.pc = pc
        this.start = Date.now()
    }
    comment = (c: string) => {
        this._comment.push(c)
    }
    stop = () => {
        if (this.stoped) {
            return
        }
        this.time = Date.now() - this.start
        this.stoped = true
    }
    result = () => {
        return {
            key: this._comment.length > 0 ? `${this.key}(${this._comment.join(',')})` : this.key,
            time: this.time
        }
    }
    finish = (comment?: string) => {
        if (comment) {
            this.comment(comment)
        }
        this.pc.finish(this)
    }
}

export class PerformanceCounter {
    marks: { [key: string]: number } = {}
    results: { [key: string]: number } = {}
    mark = (key: string) => {
        this.marks[key] = Date.now()
    }
    measure = (key: string, from: string, to: string) => {
        if (!this.marks[to] || !this.marks[from]) {
            throw Error(`lack of marks : ${this.marks[from]}(${from}) - ${this.marks[to]}(${to})`)
        }
        this.results[key] = this.marks[to] - this.marks[from]
    }
    getResults = () => {
        return this.results
    }
    start = (key: string) => {
        return new PerformanceTimer(key, this)
    }
    finish = (timer: PerformanceTimer) => {
        timer.stop()
        const ret = timer.result()
        this.results[ret.key] = ret.time
    }
}

