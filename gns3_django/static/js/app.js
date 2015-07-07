var nodes, edges, network;
var curNodeID = 0;
var curEdgeID = 0;

function toJSON(obj) {
  return JSON.stringify(obj, null, 4);
}

function addNode(){
  try{
    nodes.add({
      id: document.getElementById('node-id').value,
      label: document.getElementById('node-label').value
    });
    document.getElementById('node-id').value = '';
    document.getElementById('node-label').value = '';
    console.log("The node got added");
  } catch (err) {
    alert(err);
  }
}

function updateNode(){
  try{
    nodes.update({
      id: document.getElementById('node-id').value,
      label: document.getElementById('node-label').value
    });
    document.getElementById('node-id').value = '';
    document.getElementById('node-label').value = '';
    console.log("The node got updated");
  }catch(err){
    alert(err);
  }
}

function removeNode(){
  try{
    nodes.remove({id: document.getElementById('node-id').value});
    document.getElementById('node-id').value = '';
    document.getElementById('node-label').value = '';
  } catch(err){
    alert(err);
  }
}

function addEdge(){
  try{
    edges.add({
      id: document.getElementById('edge-id').value,
      from: document.getElementById('edge-from').value,
      to: document.getElementById('edge-to').value
    });
    document.getElementById('edge-id').value = '';
    document.getElementById('edge-from').value = '';
    document.getElementById('edge-to').value = '';
  } catch(err){
    alert(err);
  }
}

function updateEdge(){
  try{
    edges.update({
      id: document.getElementById('edge-id').value,
      from: document.getElementById('edge-from').value,
      to: document.getElementById('edge-to').value
    });
  } catch(err){
    alert(err);
  }
}

function removeEdge(){
  try{
    edges.remove({
      id: document.getElementById('edge-id').value
    });
  } catch(err) {
    alert(err);
  }
}

function draw() {
  nodes = new vis.DataSet();
  edges = new vis.DataSet();

  var container = document.getElementById('network');
  var data = {
    nodes: nodes,
    edges: edges
  };
  var options = {};
  network = new vis.Network(container, data, options);
}

/*
  Sets the server URL and Port as defined by the user
 */
function setServerDetails(){
  var data = {};
  var serverURL = document.getElementById('settingsURL').value;
  var serverPort = document.getElementById('settingsPort').value;
  data.serverURL = serverURL;
  data.serverPort = serverPort;
  console.log(data);
  $.ajax({
    url: 'settings',
    type: 'POST',
    data: data,
    success: function(data,status,jqHXR){
      alert("The server details have been updated");
      console.log(data);
      location.reload();
      //Close the modal and reload the page with new settings
    },
    error: function(err){
      console.log(err);
    }
  })
}

// function createProject(project_name) {
//   data = {name:project_name}
//   $.ajax({
//     url: 'project/create',
//     type: 'POST',
//     data: data,
//     success: function(data,status,jqHXR) {
//       data = JSON.parse(data);
      
//     }
//   });
// }
