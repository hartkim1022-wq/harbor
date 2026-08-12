import type { Account, AccountInput, Commitment, CommitmentInput, HarborData, Subscription, SubscriptionInput, Transaction, TransactionInput } from "./types";

export interface HarborRepository {
  load(): Promise<HarborData>;
  createAccount(input: AccountInput): Promise<HarborData>;
  updateAccount(id: string, input: AccountInput): Promise<HarborData>;
  deleteAccount(id: string): Promise<HarborData>;
  createTransaction(input: TransactionInput): Promise<HarborData>;
  updateTransaction(id: string, input: TransactionInput): Promise<HarborData>;
  deleteTransaction(id: string): Promise<HarborData>;
  createSubscription(input: SubscriptionInput): Promise<HarborData>; updateSubscription(id:string,input:SubscriptionInput):Promise<HarborData>; deleteSubscription(id:string):Promise<HarborData>;
  createCommitment(input: CommitmentInput): Promise<HarborData>; updateCommitment(id:string,input:CommitmentInput):Promise<HarborData>; deleteCommitment(id:string):Promise<HarborData>;
}

export class HttpHarborRepository implements HarborRepository {
  private data: HarborData | null = null;
  async load() {
    const response = await fetch("/api/harbor", { cache: "no-store" });
    if (!response.ok) throw new Error("Could not load your Harbor data.");
    this.data = await response.json() as HarborData;
    return this.data;
  }
  private async persist(data: HarborData) {
    const response = await fetch("/api/harbor", { method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify(data) });
    if (!response.ok) throw new Error("Could not save your Harbor data.");
    this.data = await response.json() as HarborData;
    return this.data;
  }
  private current() { if (!this.data) throw new Error("Repository must be loaded first."); return this.data; }
  async createAccount(input: AccountInput) {
    const now = new Date().toISOString();
    const account: Account = { ...input, id: crypto.randomUUID(), createdAt: now, updatedAt: now };
    return this.persist({ ...this.current(), accounts: [...this.current().accounts, account] });
  }
  async updateAccount(id: string, input: AccountInput) {
    return this.persist({ ...this.current(), accounts: this.current().accounts.map((item) => item.id === id ? { ...item, ...input, updatedAt: new Date().toISOString() } : item) });
  }
  async deleteAccount(id: string) {
    const data = this.current();
    return this.persist({ ...data, accounts: data.accounts.filter((item) => item.id !== id), transactions: data.transactions.filter((item) => item.accountId !== id && item.destinationAccountId !== id) });
  }
  async createTransaction(input: TransactionInput) {
    const now = new Date().toISOString();
    const transaction: Transaction = { ...input, id: crypto.randomUUID(), createdAt: now, updatedAt: now };
    return this.persist({ ...this.current(), transactions: [transaction, ...this.current().transactions] });
  }
  async updateTransaction(id: string, input: TransactionInput) {
    return this.persist({ ...this.current(), transactions: this.current().transactions.map((item) => item.id === id ? { ...item, ...input, updatedAt: new Date().toISOString() } : item) });
  }
  async deleteTransaction(id: string) { return this.persist({ ...this.current(), transactions: this.current().transactions.filter((item) => item.id !== id) }); }
  async createSubscription(input:SubscriptionInput){const stamp=new Date().toISOString();const item:Subscription={...input,id:crypto.randomUUID(),createdAt:stamp,updatedAt:stamp};return this.persist({...this.current(),subscriptions:[...this.current().subscriptions,item]});}
  async updateSubscription(id:string,input:SubscriptionInput){return this.persist({...this.current(),subscriptions:this.current().subscriptions.map(i=>i.id===id?{...i,...input,updatedAt:new Date().toISOString()}:i)});}
  async deleteSubscription(id:string){return this.persist({...this.current(),subscriptions:this.current().subscriptions.filter(i=>i.id!==id)});}
  async createCommitment(input:CommitmentInput){const stamp=new Date().toISOString();const item:Commitment={...input,id:crypto.randomUUID(),createdAt:stamp,updatedAt:stamp};return this.persist({...this.current(),commitments:[...this.current().commitments,item]});}
  async updateCommitment(id:string,input:CommitmentInput){return this.persist({...this.current(),commitments:this.current().commitments.map(i=>i.id===id?{...i,...input,updatedAt:new Date().toISOString()}:i)});}
  async deleteCommitment(id:string){return this.persist({...this.current(),commitments:this.current().commitments.filter(i=>i.id!==id)});}
}
