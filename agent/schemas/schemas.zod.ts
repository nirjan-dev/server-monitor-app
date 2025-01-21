// Generated by ts-to-zod
import { z } from "zod";

export const processInfoSchema = z.object({
  app: z.string(),
  pid: z.number(),
  cpuPercent: z.string(),
  memoryPercent: z.string(),
});

export const diskInfoSchema = z.object({
  device: z.string(),
  mountPoint: z.string(),
  total: z.string(),
  free: z.string(),
  used: z.string(),
  usedPercentage: z.string(),
});

export const memoryInfoSchema = z.object({
  total: z.string(),
  free: z.string(),
  used: z.string(),
  usedPercentage: z.string(),
});

export const cpuInfoSchema = z.object({
  cores: z.number(),
  used: z.string(),
  available: z.string(),
});

export const batteryInfoSchema = z.object({
  charge: z.string(),
});

export const containerInfoSchema = z.object({
  memoryUsedPercent: z.string(),
  memoryUsed: z.string(),
  cpuUsed: z.string(),
  name: z.string(),
  id: z.string(),
  state: z.string(),
});

export const metricsSchema = z.object({
  timestamp: z.number(),
  memory: memoryInfoSchema,
  cpu: cpuInfoSchema,
  processes: z.array(processInfoSchema),
  disk: z.array(diskInfoSchema),
  battery: batteryInfoSchema,
  containersInfo: z.array(containerInfoSchema),
});

export const commandTypeSchema = z.union([
  z.literal("process"),
  z.literal("docker"),
]);

export const baseCommandSchema = z.object({
  type: commandTypeSchema,
});

export const baseCommandResultSchema = z.object({
  timestamp: z.number(),
  success: z.boolean(),
  error: z.string().optional(),
});

export const processCommandSchema = baseCommandSchema.extend({
  type: z.literal("process"),
  action: z.union([
    z.literal("start"),
    z.literal("stop"),
    z.literal("restart"),
    z.literal("kill"),
  ]),
  processName: z.string(),
  pid: z.string(),
  signal: z
    .union([z.literal("SIGTERM"), z.literal("SIGKILL"), z.literal("SIGINT")])
    .optional(),
});

export const pSInfoSchema = z.object({
  pid: z.number(),
  name: z.string(),
  status: z.string(),
  cpu: z.number(),
  memory: z.number(),
  uptime: z.number(),
  command: z.string(),
});

export const processCommandResultSchema = baseCommandResultSchema.extend({
  processes: z.array(pSInfoSchema).optional(),
  affectedPid: z.string(),
  affectedProcessName: z.string(),
});

export const dockerCommandSchema = baseCommandSchema.extend({
  type: z.literal("docker"),
  action: z.union([
    z.literal("stop"),
    z.literal("pause"),
    z.literal("unpause"),
  ]),
  containerName: z.string(),
});

export const dockerCommandResultSchema = baseCommandResultSchema.extend({
  logs: z.string().optional(),
  containerName: z.string().optional(),
});

export const commandSchema = z.union([
  processCommandSchema,
  dockerCommandSchema,
]);

export const commandResultSchema = z.union([
  z.object({
    type: z.literal("process"),
    data: processCommandResultSchema,
  }),
  z.object({
    type: z.literal("docker"),
    data: dockerCommandResultSchema,
  }),
]);
