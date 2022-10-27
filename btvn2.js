const root = document.querySelector(".container > .folder");
render();

// sử dụng thuật toán duyệt cây
function tree(parent_node, parent_name, data) {
  !data.length && data.push({ node: parent_node, node_name: "" });
  const children = parent_node.children;
  for (let i = 0; i < children.length; i++) {
    const child_node = children[i];
    const node_name =
      parent_node != root ? parent_name + "-" + (i + 1) : parent_name + (i + 1);
    data.push({ node: children[i], node_name });
    tree(child_node, node_name, data);
  }
}

function render() {
  const data = [];
  tree(root, "", data);
  data.forEach((item) => {
    const header = document.createElement("div");
    header.classList.add(
      ...[
        "folder-header",
        item.node.children.length ? "is-parent" : "not-parent",
        "is-active",
      ]
    );
    header.innerHTML = `
      <img class='folder-icon' src="./folder_icon.png" alt="">
      <span class='folder-name'>Folder ${item.node_name}</span>
    `;

    item.node.insertBefore(header, item.node.children[0]);
  });
  handle_cick();
}

function handle_cick() {
  const header_folders = document.querySelectorAll(".folder-header");
  header_folders.forEach((item) => {
    item.onclick = function () {
      this.classList.toggle("is-active");
    };
  });
}
