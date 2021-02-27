![CI build status](https://github.com/makimenko/vect/workflows/ci/badge.svg?branch=main)

# About Vect
- Infrastructure Architecture brainstorming tool
- Based on [atft](https://github.com/makimenko/angular-template-for-threejs), [Angular](https://angular.io) and  [Google Drive API v3](https://developers.google.com/drive/api/v3/reference)

# Demo
See [Demo](https://makimenko.github.io/vect) published on GitHub page.

<a href="https://makimenko.github.io/vect">
  <img src="https://raw.githubusercontent.com/makimenko/files/master/vect/images/demo.gif">
</a>

# Features

### Dynamic 3D diagrams in a simple YAML

Easy and intuitive yaml:
```yaml
nodes:
  - name: spa
  - name: api
  - name: db1
    label: PostgreSQL
  - name: db2
    label: MongoDB
    type: barrel

edges:
  - from: spa
    to: api
  - from: api
    to: db1
  - from: api
    to: db2
```

### Auto Layout
Focus on content. [Dagre](https://github.com/dagrejs/dagre) will do an automatic layout of your diagrams.

### Icon Sets
- [Material Design Icons](https://material.io/icons/)
- [Microsoft Azure Icons](https://docs.microsoft.com/en-us/azure/architecture/icons/)

<a href="https://makimenko.github.io/vect">
  <img src="https://raw.githubusercontent.com/makimenko/files/master/vect/images/editor2.jpg">
</a>

### Diagrams persisted on personal Google drive
Diagrams stored in "Vect" folder on your personal Google Drive. Authentication and permissions are required.
No worries, application can access only Google Drive files, created via this application (other your files are inaccessible).


### Group Nodes
Group multiple nodes into a composition.
```yaml
compositions:
  - name: data
    label: Data Layer
  
nodes:
  - name: db1
    composition: data
  - name: db2
    composition: data
```

### Sample Templates
Multiple sample templates created when you first time log-in (when "Vect" folder is not present yet on your Google Drive).  
