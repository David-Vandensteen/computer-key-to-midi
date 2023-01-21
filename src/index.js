import { ApplicationConfigService } from '#src/service/applicationConfigService';
import { argService } from '#src/service/argService';
import { ApplicationService } from '#src/service/applicationService';

const config = ApplicationConfigService.get({ applicationConfigFile: 'config/application.yaml', argService });
ApplicationService.run(config);
