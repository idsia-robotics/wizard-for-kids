const fs = require('fs');
const path = require('path');

const target = path.join(
  __dirname,
  '..',
  'node_modules',
  'rclnodejs',
  'src',
  'rcl_context_bindings.cpp'
);

if (!fs.existsSync(target)) {
  console.error(`Cannot find ${target}. Run npm install --ignore-scripts first.`);
  process.exit(1);
}

const before = 'return Napi::BigInt::New(env, domain_id);';
const after = 'return Napi::BigInt::New(env, static_cast<uint64_t>(domain_id));';
const source = fs.readFileSync(target, 'utf8');

if (source.includes(after)) {
  console.log('rclnodejs BigInt patch already applied.');
  process.exit(0);
}

if (!source.includes(before)) {
  console.error('Could not find the expected rclnodejs BigInt line to patch.');
  process.exit(1);
}

fs.writeFileSync(target, source.replace(before, after));
console.log('Patched rclnodejs BigInt domain_id cast.');
