
class TabItem {
  constructor(element) {
    this.element = element;
  }

  select() {
    this.element.classList.add("Tabs__item-selected");
  }

  deselect() {
    this.element.classList.remove("Tabs__item-selected");
  }
}

class TabLink {
  constructor(element) {
    this.element = element;// attach dom element to object
  };

  select() {
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
    this.element = element;
    this.tabContents = element.querySelectorAll(".Tabs__item");
    this.tabContents = Array.from(this.tabContents).map((tabContent) => {  
      return new TabItem(tabContent);
    });
    this.links = element.querySelectorAll(".Tabs__link");  //Gets all Link elements of Tabs block
    this.links = Array.from(this.links).map((link) => { //Maps this.links from a NodeList to an array of TabLinks, each of which has a listener and a reference to its tab contents
      const tabLink = new TabLink(link);
      tabLink.tabItem = this.tabContents.find((content) => {  //Compares the data-tab values of the DOMs in tabContents to those in links, to get them paired up appropriately
        if (content.element.dataset.tab === tabLink.element.dataset.tab) return content;
      });
      tabLink.element.addEventListener('click', (event) => {
        this.updateActive(tabLink);
        console.log(tabLink);
        tabLink.select();
      });
      return tabLink;
    });
    this.activeLink = this.links[0];
    console.log(this.activeLink);
    this.init();
  }

  init() {
    this.activeLink.select();// select the first link and tab upon ititialization
  }

  updateActive(newActive) {
    this.activeLink.deselect();// deselect the old active link
    this.activeLink = newActive;// assign the new active link
    console.log(this.activeLink);
  }

  getTab(data) {
    // use the tab item classname and the data attribute to select the proper tab
    return this.element.querySelector(`.Tabs__item[data-tab="${data}"]`);
  }

}

let tabs = document.querySelectorAll(".Tabs");
tabs = Array.from(tabs).map(tabs => new Tabs(tabs));
