type BoolHash = {
  [key:string]:boolean
};

interface BemInterface {
  mod(name:string):BemInterface;
}

interface BemRootInterface extends BemInterface {
  element(name:string): BemElementInterface;
}

interface BemElementInterface extends BemInterface {
}

abstract class BemAbstract {
  protected name:string = '';
  protected mods:string[] = [];
  protected mixes:string[] = [];
  protected abstract clone(): BemAbstract;

  constructor(name:string) {
    this.name = name;
  }

  mod(name:string): BemAbstract {
    const cur = this.clone();

    cur.mods.push(name);

    return cur;
  }
}

export class BemRoot extends BemAbstract implements BemRootInterface {
  protected clone(): BemRoot {
    const element = new BemRoot(this.name);

    element.mixes = [...this.mixes];
    element.mods = [...this.mods];

    return element;
  }

  element(name:string): BemElement {
    return new BemElement(name);
  }
}

class BemElement extends BemAbstract implements BemElementInterface {
  protected clone(): BemElement {
    const element = new BemElement(this.name);

    element.mixes = [...this.mixes];
    element.mods = [...this.mods];

    return element;
  }
}