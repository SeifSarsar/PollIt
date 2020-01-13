import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-nodes-form",
  templateUrl: "./nodes-form.component.html",
  styleUrls: ["./nodes-form.component.scss"]
})
export class NodesFormComponent implements OnInit {
  @Input("maxNodes") maxNodes: number;

  @Output() nodesEvent = new EventEmitter<string[]>();
  nodes: string[] = [];

  canDeleteNode: boolean = false;
  constructor() {}

  ngOnInit() {}

  onKey(event: any) {
    switch (event.key) {
      case "Enter":
        if (event.target.value.length > 2) {
          this.addNode(event.target.value);
          event.target.value = "";
        }
        break;
      case ",":
        if (event.target.value.length > 2) {
          this.addNode(event.target.value.slice(0, -1));
          event.target.value = "";
        }
        break;
      case "Backspace":
        if (this.canDeleteNode) this.deleteLastNode();
        if (event.target.value == "") {
          this.canDeleteNode = true;
        }
        break;
      default:
        this.canDeleteNode = false;
    }
  }
  addNode(nodeContent: string) {
    const lowerNodeContent = nodeContent.toLowerCase();
    if (
      this.nodes.length < this.maxNodes &&
      !this.nodes.includes(lowerNodeContent)
    ) {
      this.nodes.push(lowerNodeContent);
      this.nodesEvent.emit(this.nodes);
    }
  }

  deleteNode(nodeContent: string) {
    for (let i: number = 0; i < this.nodes.length; i++) {
      console.log(this.nodes[i]);
      if (this.nodes[i] == nodeContent) {
        this.nodes.splice(i, 1);
        this.nodesEvent.emit(this.nodes);
        return;
      }
    }
  }
  deleteLastNode() {
    this.nodes.pop();
  }
}
