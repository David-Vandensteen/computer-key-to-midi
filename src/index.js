import { ApplicationConfigService } from '#src/service/applicationConfigService';
import { argService } from '#src/service/argService';
import { ApplicationService } from '#src/service/applicationService';

// TODO : improve abstract path for application.yaml
const config = ApplicationConfigService.get({ applicationConfigFile: ['src/config/application.yaml', 'config/application.yaml'], argService });
ApplicationService.run(config);
