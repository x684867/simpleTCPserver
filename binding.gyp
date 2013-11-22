{
    "targets": [
        {
            "target_name": "simpleTCPserver",
            "sources": [
                "simpleTCPserver.cc"
            ]
        },
        {
            "target_name": "after_build",
            "type": "none",
            "dependencies": [
                "simpleTCPserver"
            ],
            "actions": [
                {
                    "action_name": "symlink",
                    "inputs": [
                        "<@(PRODUCT_DIR)/simpleTCPserver.node"
                    ],
                    "outputs": [
                        "<(module_root_dir)/simpleTCPserver.node"
                    ],
                    "action": ["ln", "-s", "<@(PRODUCT_DIR)/simpleTCPserver.node", "<(module_root_dir)/simpleTCPserver.node"]
                }
            ]
        }
    ]
}
