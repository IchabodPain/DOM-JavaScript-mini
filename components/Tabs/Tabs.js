
class TabItem {
  constructor(element) {
    this.element = element;
  }

  select() {
    this.element.classList.add("Tabs__item-selected");
    console.log('added -selected modifier to this Tabs__item');
  }

  deselect() {
    this.element.classList.remove("Tabs__item-selected");
  }
}

class TabLink {
  constructor(element, parent) {
    this.element = element;// attach dom element to object
    this.tabs = parent;// attach parent to object
    this.tabItem = this.tabs.getTab(this.element.dataset.tab);// assign this to the associated tab using the parent's "getTab" method by passing it the correct data
    this.tabItem = new TabItem(this.tabItem);// reassign this.tabItem to be a new instance of TabItem, passing it this.tabItem
    this.element.addEventListener('click', (event) => {
      event.stopPropagation();
      this.tabs.updateActive(this);
      this.select();
      console.log(`You clicked ${this.element}!`);
    });
  };

  select() {
    console.log('Selected a tab link');
    this.element.classList.add("Tabs__link-selected");// select this link
    this.tabItem.select();// select the associated tab
  }

  deselect() {
    this.element.classList.remove("Tabs__link-selected");// deselect this link
    this.tabItem.deselect();// deselect the associated tab
  }
}

class Tabs {
  constructor(element) {
    this.element = element;// attaches the dom node to the object as "this.element"
    this.links = element.querySelectorAll(".Tabs__link");  //Gets all Link elements of Tabs block
    this.links = Array.from(this.links).map((link) => {  //Maps this.links from a NodeList to an array of TabLinks, each of which has this Tabs as a parent
      return new TabLink(link, this);
    });
    this.activeLink = this.links[0];
    this.init();
  }

  init() {
    this.activeLink.select();// select the first link and tab upon ititialization
  }

  updateActive(newActive) {
    this.activeLink.deselect();// deselect the old active link
    this.activeLink = newActive;// assign the new active link
  }

  getTab(data) {
    // use the tab item classname and the data attribute to select the proper tab
    return this.element.querySelector(`.Tabs__item[data-tab="${data}"]`);
  }

}

let tabs = document.querySelectorAll(".Tabs");
tabs = Array.from(tabs).map(tabs => new Tabs(tabs));