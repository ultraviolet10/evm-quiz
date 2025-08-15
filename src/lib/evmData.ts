export interface Opcode {
  name: string;
  value: string;
  hex: string;
  gas: number;
  description: string;
  category: 'arithmetic' | 'bitwise' | 'comparison' | 'sha3' | 'environment' | 'blockinfo' | 'stack' | 'memory' | 'storage' | 'flow' | 'system' | 'logging' | 'create';
  inputs: number;
  outputs: number;
}

export interface ConceptGroup {
  title: string;
  items: string[];
  difficulty: 'easy' | 'medium' | 'hard';
}

export const evmOpcodes: Opcode[] = [
  // Arithmetic Operations
  { name: 'ADD', value: '1', hex: '0x01', gas: 3, description: 'Addition operation', category: 'arithmetic', inputs: 2, outputs: 1 },
  { name: 'SUB', value: '2', hex: '0x02', gas: 3, description: 'Subtraction operation', category: 'arithmetic', inputs: 2, outputs: 1 },
  { name: 'MUL', value: '3', hex: '0x03', gas: 5, description: 'Multiplication operation', category: 'arithmetic', inputs: 2, outputs: 1 },
  { name: 'DIV', value: '4', hex: '0x04', gas: 5, description: 'Integer division operation', category: 'arithmetic', inputs: 2, outputs: 1 },
  { name: 'MOD', value: '6', hex: '0x06', gas: 5, description: 'Modulo remainder operation', category: 'arithmetic', inputs: 2, outputs: 1 },
  { name: 'EXP', value: '10', hex: '0x0a', gas: 10, description: 'Exponential operation', category: 'arithmetic', inputs: 2, outputs: 1 },

  // Comparison & Bitwise Logic
  { name: 'LT', value: '16', hex: '0x10', gas: 3, description: 'Less-than comparison', category: 'comparison', inputs: 2, outputs: 1 },
  { name: 'GT', value: '17', hex: '0x11', gas: 3, description: 'Greater-than comparison', category: 'comparison', inputs: 2, outputs: 1 },
  { name: 'EQ', value: '20', hex: '0x14', gas: 3, description: 'Equality comparison', category: 'comparison', inputs: 2, outputs: 1 },
  { name: 'AND', value: '22', hex: '0x16', gas: 3, description: 'Bitwise AND operation', category: 'bitwise', inputs: 2, outputs: 1 },
  { name: 'OR', value: '23', hex: '0x17', gas: 3, description: 'Bitwise OR operation', category: 'bitwise', inputs: 2, outputs: 1 },
  { name: 'XOR', value: '24', hex: '0x18', gas: 3, description: 'Bitwise XOR operation', category: 'bitwise', inputs: 2, outputs: 1 },

  // SHA3
  { name: 'SHA3', value: '32', hex: '0x20', gas: 30, description: 'Compute Keccak-256 hash', category: 'sha3', inputs: 2, outputs: 1 },

  // Environment Information
  { name: 'ADDRESS', value: '48', hex: '0x30', gas: 2, description: 'Get address of currently executing account', category: 'environment', inputs: 0, outputs: 1 },
  { name: 'BALANCE', value: '49', hex: '0x31', gas: 100, description: 'Get balance of the given account', category: 'environment', inputs: 1, outputs: 1 },
  { name: 'ORIGIN', value: '50', hex: '0x32', gas: 2, description: 'Get execution origination address', category: 'environment', inputs: 0, outputs: 1 },
  { name: 'CALLER', value: '51', hex: '0x33', gas: 2, description: 'Get caller address', category: 'environment', inputs: 0, outputs: 1 },
  { name: 'CALLVALUE', value: '52', hex: '0x34', gas: 2, description: 'Get deposited value by the instruction/transaction', category: 'environment', inputs: 0, outputs: 1 },
  { name: 'CALLDATASIZE', value: '54', hex: '0x36', gas: 2, description: 'Get size of input data', category: 'environment', inputs: 0, outputs: 1 },
  { name: 'GASPRICE', value: '58', hex: '0x3a', gas: 2, description: 'Get price of gas', category: 'environment', inputs: 0, outputs: 1 },

  // Block Information
  { name: 'BLOCKHASH', value: '64', hex: '0x40', gas: 20, description: 'Get the hash of one of the 256 most recent complete blocks', category: 'blockinfo', inputs: 1, outputs: 1 },
  { name: 'COINBASE', value: '65', hex: '0x41', gas: 2, description: 'Get the blocks beneficiary address', category: 'blockinfo', inputs: 0, outputs: 1 },
  { name: 'TIMESTAMP', value: '66', hex: '0x42', gas: 2, description: 'Get the blocks timestamp', category: 'blockinfo', inputs: 0, outputs: 1 },
  { name: 'NUMBER', value: '67', hex: '0x43', gas: 2, description: 'Get the blocks number', category: 'blockinfo', inputs: 0, outputs: 1 },
  { name: 'GASLIMIT', value: '69', hex: '0x45', gas: 2, description: 'Get the blocks gas limit', category: 'blockinfo', inputs: 0, outputs: 1 },

  // Stack, Memory, Storage and Flow Operations
  { name: 'POP', value: '80', hex: '0x50', gas: 2, description: 'Remove item from stack', category: 'stack', inputs: 1, outputs: 0 },
  { name: 'MLOAD', value: '81', hex: '0x51', gas: 3, description: 'Load word from memory', category: 'memory', inputs: 1, outputs: 1 },
  { name: 'MSTORE', value: '82', hex: '0x52', gas: 3, description: 'Save word to memory', category: 'memory', inputs: 2, outputs: 0 },
  { name: 'SLOAD', value: '84', hex: '0x54', gas: 100, description: 'Load word from storage', category: 'storage', inputs: 1, outputs: 1 },
  { name: 'SSTORE', value: '85', hex: '0x55', gas: 100, description: 'Save word to storage', category: 'storage', inputs: 2, outputs: 0 },
  { name: 'JUMP', value: '86', hex: '0x56', gas: 8, description: 'Alter the program counter', category: 'flow', inputs: 1, outputs: 0 },
  { name: 'JUMPI', value: '87', hex: '0x57', gas: 10, description: 'Conditionally alter the program counter', category: 'flow', inputs: 2, outputs: 0 },

  // Push Operations
  { name: 'PUSH1', value: '96', hex: '0x60', gas: 3, description: 'Place 1 byte item on stack', category: 'stack', inputs: 0, outputs: 1 },
  { name: 'PUSH2', value: '97', hex: '0x61', gas: 3, description: 'Place 2-byte item on stack', category: 'stack', inputs: 0, outputs: 1 },
  { name: 'PUSH32', value: '127', hex: '0x7f', gas: 3, description: 'Place 32-byte item on stack', category: 'stack', inputs: 0, outputs: 1 },

  // System operations
  { name: 'CREATE', value: '240', hex: '0xf0', gas: 32000, description: 'Create a new account with associated code', category: 'create', inputs: 3, outputs: 1 },
  { name: 'CALL', value: '241', hex: '0xf1', gas: 100, description: 'Message-call into an account', category: 'system', inputs: 7, outputs: 1 },
  { name: 'RETURN', value: '243', hex: '0xf3', gas: 0, description: 'Halt execution returning output data', category: 'system', inputs: 2, outputs: 0 },
  { name: 'REVERT', value: '253', hex: '0xfd', gas: 0, description: 'Halt execution reverting state changes', category: 'system', inputs: 2, outputs: 0 },

  // Logging
  { name: 'LOG0', value: '160', hex: '0xa0', gas: 375, description: 'Append log record with no topics', category: 'logging', inputs: 2, outputs: 0 },
  { name: 'LOG1', value: '161', hex: '0xa1', gas: 750, description: 'Append log record with one topic', category: 'logging', inputs: 3, outputs: 0 },
];

export const evmConceptGroups: ConceptGroup[] = [
  {
    title: 'Stack Operations',
    items: ['PUSH', 'POP', 'DUP', 'SWAP'],
    difficulty: 'easy'
  },
  {
    title: 'Arithmetic Operations', 
    items: ['ADD', 'SUB', 'MUL', 'DIV'],
    difficulty: 'easy'
  },
  {
    title: 'Memory Operations',
    items: ['MLOAD', 'MSTORE', 'MSIZE', 'MCOPY'],
    difficulty: 'medium'
  },
  {
    title: 'Storage Operations',
    items: ['SLOAD', 'SSTORE', 'TLOAD', 'TSTORE'],
    difficulty: 'medium'
  },
  {
    title: 'Control Flow',
    items: ['JUMP', 'JUMPI', 'JUMPDEST', 'PC'],
    difficulty: 'medium'
  },
  {
    title: 'Environment Info',
    items: ['ADDRESS', 'CALLER', 'ORIGIN', 'GASPRICE'],
    difficulty: 'medium'
  },
  {
    title: 'Block Info',
    items: ['BLOCKHASH', 'COINBASE', 'TIMESTAMP', 'NUMBER'],
    difficulty: 'medium'
  },
  {
    title: 'Comparison Operations',
    items: ['LT', 'GT', 'EQ', 'ISZERO'],
    difficulty: 'easy'
  },
  {
    title: 'Bitwise Operations',
    items: ['AND', 'OR', 'XOR', 'NOT'],
    difficulty: 'medium'
  },
  {
    title: 'System Calls',
    items: ['CALL', 'CALLCODE', 'DELEGATECALL', 'STATICCALL'],
    difficulty: 'hard'
  },
  {
    title: 'Contract Creation',
    items: ['CREATE', 'CREATE2', 'SELFDESTRUCT', 'RETURN'],
    difficulty: 'hard'
  },
  {
    title: 'Event Logging',
    items: ['LOG0', 'LOG1', 'LOG2', 'LOG3'],
    difficulty: 'medium'
  }
];

export function getRandomOpcodes(count: number = 4, category?: string): Opcode[] {
  const filtered = category ? evmOpcodes.filter(op => op.category === category) : evmOpcodes;
  const shuffled = [...filtered].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export function getRandomConceptGroup(): ConceptGroup {
  return evmConceptGroups[Math.floor(Math.random() * evmConceptGroups.length)];
}