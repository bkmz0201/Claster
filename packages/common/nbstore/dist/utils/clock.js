export class ClockMap {
    constructor(map) {
        this.map = map;
        this.max = new Date(0);
        for (const value of map.values()) {
            if (value.getTime() > this.max.getTime()) {
                this.max = value;
            }
        }
    }
    get(id) {
        return this.map.get(id) ?? new Date(0);
    }
    set(id, value) {
        this.map.set(id, value);
        if (value.getTime() > this.max.getTime()) {
            this.max = value;
        }
    }
    setIfBigger(id, value) {
        if (value.getTime() > this.get(id).getTime()) {
            this.set(id, value);
            return true;
        }
        return false;
    }
    clear() {
        this.map.clear();
        this.max = new Date(0);
    }
    keys() {
        return Array.from(this.map.keys());
    }
}
//# sourceMappingURL=clock.js.map