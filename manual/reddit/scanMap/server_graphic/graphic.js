function createMap() {
  var data = JSON.parse(document.getElementById("data").value);
  var nodes = new vis.DataSet(data["nodes"]);
  var edges = new vis.DataSet(data["edges"]);

  // create a network
  var container = document.getElementById("mynetwork");
  var data = {
    nodes: nodes,
    edges: edges
  };
  var options = {
    layout: {
      hierarchical: {
        direction: "UD",
        sortMethod: "directed",
        shakeTowards: "roots"
      }
    }
  };

  if (document.getElementById("layout").value == "map") {
    options = {};
  }

  var network = new vis.Network(container, data, options);
}
