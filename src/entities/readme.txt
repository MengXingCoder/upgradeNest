总共 5 张表都要有数据
插入顺序必须满足外键依赖：
先插 permissions 和 roles（无依赖）
再插 role_permissions（依赖前两者 ID）
同时或之后插 users
最后插 user_roles（依赖 users.id 和 roles.id）


--1. 权限
INSERT INTO permissions (name, action) VALUES 
  ('article:create', 'create'),
  ('article:edit', 'edit');

-- 2. 角色
INSERT INTO roles (name) VALUES ('editor');

-- 3. 角色-权限关联
INSERT INTO role_permissions (RoleId, permissionId) VALUES 
  (1, 1), -- editor → article:create
  (1, 2); -- editor → article:edit

-- 4. 用户
INSERT INTO users (username, password) VALUES 
  ('alice', 'xxx');

-- 5. 用户-角色关联
INSERT INTO user_roles (UserId, RoleId) VALUES 
  (1, 1); -- alice → editor