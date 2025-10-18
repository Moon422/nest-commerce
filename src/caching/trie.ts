class TrieNode {
  children = new Map<string, TrieNode>()
  keys = new Set<string>()
}

export default class Trie {
  root = new TrieNode()

  insert(key: string): void {
    let node = this.root
    for (const c of key) {
      if (!node.children.has(c)) node.children.set(c, new TrieNode())
      node = node.children.get(c)!
      node.keys.add(key)
    }
  }

  getKeysWithPrefix(prefix: string): string[] {
    let node = this.root
    for (const c of prefix) {
      if (!node.children.has(c)) return []
      node = node.children.get(c)!
    }
    return Array.from(node.keys)
  }

  removeKey(key: string): void {
    let node = this.root
    for (const c of key) {
      if (!node.children.has(c)) return
      node = node.children.get(c)!
      node.keys.delete(key)
    }
  }

  clear(): void {
    this.root = new TrieNode()
  }
}
