type BoolHash = {
  [key:string]:boolean
};

type LikeArray = string|BoolHash|string[];

interface BemInterface {
  mod(name:LikeArray): BemInterface;

  mix(name:LikeArray): BemInterface;
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

  public mod(name: LikeArray): BemAbstract {
    const cur = this.clone();

    cur.mods.push(...likeArrayToArray(name));

    return cur;
  }

  public mix(name: LikeArray): BemAbstract {
    const cur = this.clone();

    cur.mixes.push(...likeArrayToArray(name));

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

    result.push(this.name);
    result.push(...this.mods.map(mod => result[0] + '_' + mod));
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

    result.push(this.name + '__' + this.parent);
    result.push(...this.mods.map(mod => result[0] + '_' + mod));
    result.push(...this.mixes);

    return result.join(' ');
  }
}

function likeArrayToArray(arr:LikeArray): string[] {
  if(typeof arr == 'string') {
    return arr.split(' ');
  } else if(arr instanceof Array) {
    return arr;
  } else {
    return hashToArr(arr);
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

export default BemRoot;