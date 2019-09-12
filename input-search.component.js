parasails.registerComponent('input-search', {
  props: ['list','placeholder','id','iconClass','current','error','checkViewPort'],
  created: function(){
    if (this.current !== 0) {
      const curr = this.current;
      this.item = this.list.find(function(item) {
        return item.id == curr;
      });
      if (typeof this.item !== 'undefined' && this.item.hasOwnProperty('name')) {
        this.search = this.item.name;
      }
    }
  },
  mounted: function() {
    document.addEventListener("click", this.handleClick);
  },
  destroyed: function() {
    document.removeEventListener("click", this.handleClick);
  },
  methods: {
    searchList: function() {
      // Calculate viewport is for if we want to check if their is space below before displaying
      if (this.checkViewPort) {
         const top = this.calcViewport(this.$refs.exerciseSearch);
      }
      const searchTerm = this.search;
      if (searchTerm.trim() == "") {
        this.matchedSearch = this.list;
        this.selectItem({id: 0, name: ""});
      }
      this.matchedSearch = this.list.filter(function(item, arr, ind) {
        if (item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
          return item;
        }
      });
    },
    selectItem: function(item) {
      this.search = item.name;
      this.matchedSearch = [];
      this.item = item;
      this.$emit("selected", this.item);
    },
    calcViewport: function(ref) {
      const menuHeight = 200;
      const elr = ref.getBoundingClientRect();
      const win = window.innerHeight;
      const top = elr.top;
      const height = ref.offsetHeight + menuHeight;
      const sp = win - (top + height);
      return sp > 0;
    },
    close: function() {
      this.selectItem({id: 0, name: ""});
    },
    arrowDown: function() {
      if (this.keyIndex < this.matchedSearch.length) {
        this.keyIndex+=1;
      }
    },
    arrowUp: function() {
      if (this.keyIndex > 0) {
        this.keyIndex-=1;
      }
    },
    enter: function() {
      this.selectItem(this.matchedSearch[this.keyIndex]);
      this.keyIndex = -1;
    },
    handleClick: function(e) {
      if (!this.$el.contains(e.target)) {
        this.matchedSearch = [];
        this.keyIndex = -1;
        if (typeof this.item !== 'undefined' && this.item.hasOwnProperty("name") && this.item.name.trim() !== "") {
          this.search = this.item.name;
        }
      }
    }
  },
  data: function() {
    return {
      exError: "",
      item: {},
      search: "",
      matchedSearch: [],
      keyIndex: -1
    };
  },
  template: `
  <div class="input-search">
    <div class="autocomplete">
      <div class="input-group">
        <input :placeholder="placeholder" :id="id" :ref="id" v-model="search" v-bind:class="{'is-invalid' : error}" @input.prevent="searchList" @click.prevent="searchList" class="form-control" @keydown.up="arrowUp" @keydown.down="arrowDown" @keydown.enter="enter" autocomplete="off">
        <div class="input-group-append" @click="close()">
          <span class="fa fa-close close input-group-text"></span>
        </div>
      </div>
      <ul class="autocomplete-results list-group" v-show="matchedSearch.length > 0">
        <li v-for="(ele, i) in matchedSearch" :key="i" @click="selectItem(ele)" :class="{ 'is-active': i === keyIndex }" class="autocomplete-result list-group-item">{{ele.name}}</li>
      </ul>
    </div>
  </div>
  `
});
