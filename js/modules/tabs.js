function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
        // Tabs
const tabs = document.querySelectorAll(tabsSelector),
      tabsContent = document.querySelectorAll(tabsContentSelector),
      tabsParent = document.querySelector(tabsParentSelector);

  function hideTabContent() {
      tabsContent.forEach(item => {
          item.classList.add('hide');
          item.classList.remove('show', 'fade');
      })

      tabs.forEach(item => {
          item.classList.remove(activeClass);
      })
  }

  function showTabContent(i = 0) {
      tabsContent[i].classList.add('show', 'fade');
      tabsContent[i].classList.remove('hide');
      tabs[i].classList.add(activeClass);
  }

  tabsParent.addEventListener('click', (e) => {
      if(e.target && e.target.classList.contains(tabsSelector.slice(1))){
          tabs.forEach((tab, i) => {
              if(e.target == tab) {
                  hideTabContent(i);
                  showTabContent(i)
              }
          })
      }
  })
  hideTabContent();
  showTabContent();
}
export default tabs;