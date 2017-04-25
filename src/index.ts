type BoolHash = {
  [key:string]:boolean
};

interface BemInterface {
  mod(name:string): BemInterface;
  mod(name:BoolHash): BemInterface;
  mod(name:string[]): BemInterface;

  mix(name:string): BemInterface;
  mix(name:BoolHash): BemInterface;
  mix(name:string[]): BemInterface;
}

interface BemRootInterface extends BemInterface {
  element(name:string): BemElementInterface;
}

interface BemElementInterface extends BemInterface {
  parent:string;
}

abstract class BemAbstract{
  protected name:string = '';
  protected mods:string[] = [];
  protected mixes:string[] = [];
  protected abstract clone(): BemAbstract;
  protected abstract stringify(): string;

  constructor(name:string) {
    this.name = name;
  }

  public mod(name: string|string[]|BoolHash): BemAbstract {
    const cur = this.clone();
    const arr = (typeof name == 'string') ? name.split(' ') : (name instanceof Array ? name : hashToArr(name));

    cur.mods.push(...arr);

    return cur;
  }

  public mix(name: string|string[]|BoolHash): BemAbstract {
    const cur = this.clone();
    const arr = (typeof name == 'string') ? name.split(' ') : (name instanceof Array ? name : hashToArr(name));

    cur.mixes.push(...arr);

    return cur;
  }

  public toString(): string {
    return this.stringify();
  }
}

export class BemRoot extends BemAbstract implements BemRootInterface {
  protected clone(): BemRoot {
    const element = new BemRoot(this.name);

    element.mixes = [...this.mixes];
    element.mods = [...this.mods];

    return element;
  }

  public element(name:string): BemElement {
    return new BemElement(name, this.name);
  }

  public stringify(): string {
    const result:string[] = [];

    result.push(...this.mods.map(mod => this.name + '_' + mod));
    result.push(...this.mixes);

    return result.join(' ');
  }
}

class BemElement extends BemAbstract implements BemElementInterface {
  parent:string;

  constructor(name:string, parent:string) {
    super(name);

    this.parent = parent;
  }

  protected clone(): BemElement {
    const element = new BemElement(this.name, this.parent);

    element.mixes = [...this.mixes];
    element.mods = [...this.mods];

    return element;
  }

  public stringify(): string {
    const result:string[] = [];

    result.push(...this.mods.map(mod => this.name + '__' + this.parent + '_' + mod));
    result.push(...this.mixes);

    return result.join(' ');
  }
}

function hashToArr(hash:BoolHash): string[] {
  const result:string[] = [];

  for(let key in hash) {
    if(hash[key]) {
      result.push(key);
    }
  }

  return result;
}