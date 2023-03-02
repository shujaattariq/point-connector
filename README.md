# Point Connector

A simple library that create lines (connectors) between points (two or more).

```html
<div class="point-group">
  <div class="point" data-point-type="speed" style="background-color: red; left: 1674px; top: 2px;">0</div>
  <div class="point" data-point-type="speed" style="background-color: red; left: 924px; top: 614px;">1</div>
  <div class="point" data-point-type="speed" style="background-color: red; left: 206px; top: 421px;">2</div>
  <div class="point" data-point-type="acceleration" style="background-color: green; left: 429px; top: 383px;">0</div>
  <div class="point" data-point-type="acceleration" style="background-color: green; left: 1775px; top: 296px;">1</div>
  <div class="point" data-point-type="acceleration" style="background-color: green; left: 1456px; top: 123px;">2</div>
  <div class="point" data-point-type="control" style="background-color: blue; left: 1784px; top: 79px;">0</div>
  <div class="point" data-point-type="control" style="background-color: blue; left: 170px; top: 316px;">1</div>
  <div class="point" data-point-type="control" style="background-color: blue; left: 66px; top: 71px;">2</div>
</div>
```

```javascript
<script>
  PointConnector({
    groupSelector: ".point-group",
    connectorStyle: "dotted"
  }).initialize();
</script>
```

